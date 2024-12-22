/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "watchSchema": {
        "url": "http://localhost:8000/"
    },
    "plugins": {
        "houdini-svelte": {
            client: "./src/client",
        },
    },
    "scalars": {
        "Ok": {
            "type": "\"ok\"",
        },
        "JSONObject": {
            "type": "{ [key: string]: any }",
        },
    },
}

export default config
