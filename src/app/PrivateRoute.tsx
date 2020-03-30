import {useQuery} from "../hooks/useQuery";
import {Redirect, Route} from "react-router";
import React from "react";

interface OwnProps {
    children: React.ReactNode;
    path?: string;
    exact?: boolean;
}

export function PrivateRoute({ children, ...rest }: OwnProps) {
    const query = useQuery();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                query.get("token") ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/user/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
