import cors from "cors";

const corsOptions = {
	credentials: true,
	methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Forwarded-For", "Origin", "Accept", "Proxy-Authorization"],
	origin: ["http://localhost:5173", "http://localhost:3000"]
};

export default cors(corsOptions);
