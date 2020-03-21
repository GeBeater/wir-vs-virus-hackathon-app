import React, {useEffect, useState} from 'react';
import DropIn from "braintree-web-drop-in-react";

export default function Payment() {
    const [token, setToken] = useState(null);
    const [instance, setInstance] = useState(null);
    useEffect(() => {
        fetch("/api/payment/token", {method: 'POST'}).then(resp => {
            return resp.json();
        }).then(json => {
            setToken(json.token);
        });

    }, [])

    async function buy() {
        // Send the nonce to your server
        const {nonce} = await instance.requestPaymentMethod();
        const data = {
            nonce,
            amount: 10.00
        }
        await fetch('/api/payment/checkout', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    return (
        <div>
            {token &&
                <>
                    <DropIn
                        options={{
                            authorization: token,
                            paypal: {
                                flow: 'checkout',
                                amount: 10.00,
                                currency: 'EUR',
                                commit: true
                            }
                        }}
                        onInstance={setInstance}
                    />
                    <button onClick={buy}>Buy</button>
                </>
            }

            {/* <button onClick={this.buy.bind(this)}>Buy</button> */}
        </div>
    )
}
