import app from "./app";
const PORT = 3000;

/**
 * This just starts things off
 */
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})