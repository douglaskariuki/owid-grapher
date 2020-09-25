#! /usr/bin/env yarn jest

import { Grapher } from "grapher/core/Grapher"
import { DimensionProperty } from "grapher/core/GrapherConstants"

describe("ChartConfig", () => {
    it("allows single-dimensional explorer charts", () => {
        const grapher = new Grapher({
            type: "LineChart",
            hasChartTab: false,
            manuallyProvideData: true,
            hasMapTab: false,
            isExplorable: true,
            dimensions: [
                { property: DimensionProperty.y, variableId: 1, display: {} },
            ],
        })
        expect(grapher.isExplorableConstrained).toBe(true)
    })

    it("does not allow explorable scatter plots", () => {
        const grapher = new Grapher({
            type: "ScatterPlot",
            hasChartTab: true,
            manuallyProvideData: true,
            isExplorable: true,
            dimensions: [
                { property: DimensionProperty.y, variableId: 1, display: {} },
            ],
        })
        expect(grapher.isExplorableConstrained).toBe(false)
    })

    it("does not allow multi-dimensional charts", () => {
        const grapher = new Grapher({
            type: "LineChart",
            hasChartTab: true,
            isExplorable: true,
            manuallyProvideData: true,
            dimensions: [
                { property: DimensionProperty.y, variableId: 1, display: {} },
                { property: DimensionProperty.y, variableId: 2, display: {} },
            ],
        })
        expect(grapher.isExplorableConstrained).toBe(false)
    })
})
