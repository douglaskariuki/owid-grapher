import React from "react"
import classnames from "classnames"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core/index.js"
import { faSortAlphaUpAlt } from "@fortawesome/free-solid-svg-icons/faSortAlphaUpAlt.js"
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons/faSortAlphaDown.js"
import { faSortAmountUpAlt } from "@fortawesome/free-solid-svg-icons/faSortAmountUpAlt.js"
import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons/faSortAmountDown.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index.js"
import { SortOrder } from "../../coreTable/CoreTableConstants.js"

export function SortIcon(props: {
    type?: "text" | "numeric"
    isActiveIcon?: boolean
    order: SortOrder
}): JSX.Element {
    const type = props.type ?? "numeric"
    const isActiveIcon = props.isActiveIcon ?? false

    let faIcon: IconDefinition

    if (type === "text")
        faIcon =
            props.order === SortOrder.desc ? faSortAlphaUpAlt : faSortAlphaDown
    else
        faIcon =
            props.order === SortOrder.desc
                ? faSortAmountDown
                : faSortAmountUpAlt

    return (
        <span
            className={classnames({ "sort-icon": true, active: isActiveIcon })}
        >
            <FontAwesomeIcon icon={faIcon} />
        </span>
    )
}
