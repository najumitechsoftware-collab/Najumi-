/*
Najumi UI Library Loader
*/

import { initUIButton } from "./button/button.js"
import { initUIInput } from "./input/input.js"
import { initUICard } from "./card/card.js"
import { initUIModal } from "./modal/modal.js"
import { initUIDropdown } from "./dropdown/dropdown.js"
import { initUITable } from "./table/table.js"
import { initUIForm } from "./form/form.js"

/*
Initialize all UI components
*/

export function initNajumiUI() {

initUIButton()

initUIInput()

initUICard()

initUIModal()

initUIDropdown()

initUITable()

initUIForm()

}