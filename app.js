const express = require("express");
const config = require("./config/config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/email', require("./routes/email.routes"))


const PORT = config.PORT || 5000;

async function startServer() {
    try {
        await mongoose.connect(config.KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => {
            console.log(`app has been started on port ${PORT}`);
        });
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

startServer();
