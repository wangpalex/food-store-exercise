import PageContent from "./components/PageContent";
import Orders from "./components/Orders";
import Modify from "./components/Modify"
import Dashboard from "@/components/Dashboard";

export default [
    { path: '/', component: PageContent },
    { path: '/orders', component: Orders },
    { path: '/modify', name: "modify", component: Modify, props: true},
    { path: '/dashboard', name: "dashboard", component: Dashboard },
]