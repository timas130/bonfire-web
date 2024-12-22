import {HoudiniClient} from "$houdini";
import {env as envPublic} from "$env/dynamic/public";

const url = envPublic.PUBLIC_GQL_URL || "http://127.0.0.1:8000/";

export default new HoudiniClient({
    url: url,
    fetchParams({ session }) {
        return {
            headers: {
                Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
            },
        };
    },
});
