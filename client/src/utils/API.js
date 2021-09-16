import React from "react";
const Documenu = require('documenu');
Documenu.configure('bc07f64299960a8b13f9a3d3e07ebf52');

// make a search to documenu restaurant api


// export const searchRestuaraunts = (query) => {
//     return fetch(`https://api.documenu.com/v2/restaurant/4072702673999819?key=bc07f64299960a8b13f9a3d3e07ebf52`);
// };


export default class DocuMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }


    async componentDidMount() {
        fetch(`https://api.documenu.com/v2/restaurant/4072702673999819?key=bc07f64299960a8b13f9a3d3e07ebf52`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            );
        }

    }

}