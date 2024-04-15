// function that returns a url string with server address then desired route
export default function buildPath(route) {
   if (route.charAt(0) === "/") return "http://localhost:8080" + route;
   else return "http://localhost:8080/" + route;
}
