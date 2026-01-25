import userRoute from "../routes/userRoutes.js";
import workSpaceRoute from "../routes/workSpaceRoutes.js";
import projectRoutes from "../routes/projectRoute.js";
import landingRoutes from "../routes/landingRoutes.js";
import profileRoutes from "../routes/profileRoutes.js"

export default function(app) {
    app.use("/user", userRoute);
    app.use("/workspace", workSpaceRoute);
    app.use("/project", projectRoutes);
    app.use("/landingPage", landingRoutes);
    app.use("/profile", profileRoutes);
}