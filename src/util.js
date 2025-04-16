import * as AllModels from "./Modal/index.jsx";

export const componentMap = Object.fromEntries(
    Object.entries(AllModels).map(([name, comp]) => [name, comp])
);