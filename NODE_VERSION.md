# Node.js Version Requirements

## Issue
The project uses `Array.prototype.toReversed()` which requires **Node.js 20.0.0 or higher**.

## Error
If you see this error:
```
TypeError: configs.toReversed is not a function
```

It means you're running Node.js version < 20.

## Solutions

### Option 1: Update Node.js (Recommended)
Update to Node.js 20 or higher:

```bash
# Using nvm (Node Version Manager)
nvm install 20
nvm use 20

# Or download from nodejs.org
# https://nodejs.org/
```

### Option 2: Use Polyfill (Temporary)
A polyfill has been added to `metro.config.js` to support older Node.js versions. However, **updating Node.js is strongly recommended** for best compatibility.

## Check Your Node.js Version
```bash
node --version
```

You should see `v20.x.x` or higher.

## Why Node.js 20+?
- Expo SDK 54 and Metro bundler use modern JavaScript features
- Better performance and security
- Full compatibility with all dependencies
