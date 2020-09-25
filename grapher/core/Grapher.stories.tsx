import * as React from "react"
import { Grapher, GrapherProps } from "./Grapher"
import { SynthesizeOwidTable } from "coreTable/OwidTable"
import { DimensionProperty } from "./GrapherConstants"

export default {
    title: "Grapher",
    component: Grapher,
}

const table = SynthesizeOwidTable()

const props: GrapherProps = {
    table,
    hasMapTab: true,
    dimensions: [{ slug: "GDP", property: DimensionProperty.y, variableId: 1 }],
    type: "LineChart",
}

table.selectAll()

export const Default = () => <Grapher {...props} />
