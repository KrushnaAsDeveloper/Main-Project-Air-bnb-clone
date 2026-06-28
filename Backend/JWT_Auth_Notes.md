# JWT Authentication — cosy_cloud

## The Problem JWT Solves

HTTP is **stateless** — every request is independent. The server remembers nothing between requests.

**Old approach (Sessions):** Every request hits the DB to check session. Doesn't scale.

**JWT approach:** Client carries a signed token. Server just verifies the signature — no DB lookup needed.

---

## What a JWT Looks Like

```
header.payload.signature
eyJhbGci.eyJ1c2Vy.SflKxwRJ
```

Three Base64-encoded parts joined by dots.

### Header (auto-generated)
```json
{ "alg": "HS256", "typ": "JWT" }
```

### Payload (your data)
```json
{ "userId": "666", "email": "kr@gmail.com", "iat": 1716000000, "exp": 1716086400 }
```

### Signature (security)
```
HMACSHA256(header + payload + JWT_SECRET)
```

The signature is what makes the token tamper-proof. If anyone modifies the payload, the signature won't match — server rejects it.

---

## Key Concepts

| Concept | What it means |
|---|---|
| **Base64** | Encoding — converts data to safe text. Readable by anyone. NOT secure. |
| **Encoding** | Converting format — reversible by anyone, no key needed |
| **Encryption** | Locking data with a key — only unlockable with the same key |
| **Hashing** | One-way scramble — can never be reversed (bcrypt) |
| **Salt rounds** | How many times bcrypt scrambles. 10 = industry standard |
| **Bearer** | Convention prefix for JWT in Authorization header |
| **localStorage** | Browser storage — survives page refresh |
| **Middleware** | Gatekeeper function that runs before route handler |
| **next()** | Passes control from middleware to route handler |
| **req.user** | Decoded token payload attached to request by middleware |

---

## Why Bcrypt Can Compare Plain vs Hashed

The hash contains the salt baked inside it:
```
"$2b$10$N9qo8uLOickgx..."
  ↑   ↑  ↑
  |   |  └── hash + salt
  |   └───── salt rounds
  └───────── bcrypt version
```

`bcrypt.compare()` extracts the salt → re-hashes the input → compares result. Never reverses the hash.

---

## JWT_SECRET

You create it yourself and store in `.env`:
```bash
JWT_SECRET=a3f9b2c7e1d84f6a29b0c3e5d7f1a2b4
```

Generate a strong one:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Rules:**
- Never hardcode it in source code
- Always in `.env`
- `.env` must be in `.gitignore`

---

## Token Lifecycle

```
Register/Login → jwt.sign() → token created
                            → res.json(token) → sent to frontend
                            → localStorage.setItem(token) → stored in browser

Every protected request → Authorization: Bearer token
                       → middleware jwt.verify() → req.user set → route runs

Logout → localStorage.removeItem(token) → done
```

---

## User Model

```js
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User
```

---

## Register Route

```js
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body

    // check duplicate
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "Email already registered" })

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // save to MongoDB
    const newUser = new User({ email, username, password: hashedPassword })
    await newUser.save()

    // create token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({
      token,
      user: { id: newUser._id, email: newUser.email, username: newUser.username }
    })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})
```

---

## Login Route

```js
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // find user
    const findUser = await User.findOne({ email })
    if (!findUser) return res.status(404).json({ message: "Email not found" })

    // compare password
    const isMatched = await bcrypt.compare(password, findUser.password)
    if (!isMatched) return res.status(401).json({ message: "Invalid password" })

    // create token
    const token = jwt.sign(
      { userId: findUser._id, email: findUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      user: { id: findUser._id, email: findUser.email, username: findUser.username }
    })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})
```

---

## Protect Middleware

```js
import jwt from "jsonwebtoken"

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export default protect
```

### Apply to Routes:
```js
import protect from "./middleware/protect.js"

app.get("/listings", getListings)              // public
app.post("/listings", protect, createListing)  // protected
app.put("/listings/:id", protect, updateListing)   // protected
app.delete("/listings/:id", protect, deleteListing) // protected
```

---

## Frontend — Register handleSubmit

```js
const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")
  setLoading(true)

  try {
    const res = await axios.post("http://localhost:5000/register", formData)
    localStorage.setItem("token", res.data.token)
    navigate("/")
  } catch (err) {
    setError(err.response?.data?.message || "Server error. Try again.")
  } finally {
    setLoading(false)
  }
}
```

---

## Frontend — Login handleSubmit

```js
const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")
  setLoading(true)

  try {
    const res = await axios.post("http://localhost:5000/login", formData)
    localStorage.setItem("token", res.data.token)
    navigate("/")
  } catch (err) {
    setError(err.response?.data?.message || "Server error. Try again.")
  } finally {
    setLoading(false)
  }
}
```

---

## Sending Token on Protected Requests

```js
axios.post("/listings", listingData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})
```

---

## fetch vs axios Differences

| | fetch | axios |
|---|---|---|
| Parse response | `res.json()` | `res.data` (automatic) |
| Check errors | `if (!res.ok)` | automatic → goes to catch |
| Error message | manual | `err.response?.data?.message` |

---

## Register vs Login Comparison

```
REGISTER:                        LOGIN:
─────────────────────────────    ──────────────────────────
check duplicate email            find user by email
hash password (bcrypt)           compare password (bcrypt)
save to MongoDB                  (no saving)
jwt.sign() → token               jwt.sign() → token
send token back                  send token back
```

---

## What's Next

```
✅ User Model
✅ Register Route
✅ Login Route
✅ Protect Middleware
⬜ AuthContext — global user state in React
⬜ ProtectedRoute component — frontend route guard
⬜ Logout — clear token + clear user
⬜ Navbar — show username / logout button
```
