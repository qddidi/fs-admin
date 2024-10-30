import { App } from "vue";
import { hasPerm } from "./permisson/hasPerm";
export default function directive(app: App<Element>) {
    app.directive('hasPerm', hasPerm)
}