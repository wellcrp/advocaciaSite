import app from "./app";
import env from "./config/env";

app.listen(env.port, () => {
  console.info(`API iniciada em http://localhost:${env.port}`);
});
