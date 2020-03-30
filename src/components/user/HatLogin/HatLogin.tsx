import React, {useEffect, useState} from "react";
import {useQuery} from "../../../hooks/useQuery";
import {HatClient} from "@dataswift/hat-js";
import {HatApplication} from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import {Hmi} from "../../hmi/Hmi/Hmi";
import {HmiType} from "../../../features/hmi/hmi.interface";

const HatLogin: React.FC = () => {
    const [app, setApp] = useState<HatApplication | null>(null);
    const query = useQuery();

    useEffect(() => {
        const token = query.get("token");

        const hat = new HatClient({token: token || '', secure: false, apiVersion: 'v2.6'});

        hat.applications().getById("hatapp")
            .then((res) => {
                if (res.parsedBody) {
                    setApp(res.parsedBody);
                }
            })

    }, []);
    // console.log(token);
    return (
        <div>
            {app &&
                <Hmi appId={'hatapp'} registrationType={HmiType.baas} />
            }
            {/*<UpdateNotes app={app.application} />*/}
        </div>)
};

export default HatLogin
