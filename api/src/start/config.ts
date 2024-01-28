import config from "config";

const secret = () => {
  if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: jwtPrivateKey is not provided.");
    process.exit(1);
  }
};

export default secret;
