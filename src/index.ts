import express from "express";
import router from "../router/router";
import { logFunctionExecutionTime } from "../middleware/logFunctionExecutionTime";
import { isAuth } from "../middleware/isAuth";
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(logFunctionExecutionTime);
app.use("/api/user", isAuth);
app.use("/api/user", router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
