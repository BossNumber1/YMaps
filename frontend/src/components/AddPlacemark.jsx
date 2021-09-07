import React from "react";
import axios from "axios";

function AddPlacemark({ setNoPlacemarks, setPlacemarker, dataPlacemarks }) {
    const createPlacemark = (e) => {
        e.preventDefault();

        let nameToAdd = document.getElementById("nameToAdd").value;
        let latitudeToAdd = document.getElementById("latitudeToAdd").value;
        let longitudeToAdd = document.getElementById("longitudeToAdd").value;

        axios
            .post("http://localhost:80/createPlacemark/", {
                name: nameToAdd,
                latitude: latitudeToAdd,
                longitude: longitudeToAdd,
                token: localStorage.getItem("token"),
            })
            .then(() => {
                setNoPlacemarks(false);

                document.getElementById("nameToAdd").value = "";
                document.getElementById("latitudeToAdd").value = "";
                document.getElementById("longitudeToAdd").value = "";

                const initialValue = [
                    {
                        name: nameToAdd,
                        latitude: latitudeToAdd,
                        longitude: longitudeToAdd,
                    },
                ];

                if (dataPlacemarks.length > 0) {
                    setPlacemarker([...dataPlacemarks, initialValue[0]]);
                } else {
                    setPlacemarker(initialValue);
                }
            });
    };

    return (
        <div style={{ marginBottom: 25, marginRight: 25 }}>
            <form>
                <div>
                    <input type="text" id="nameToAdd" placeholder="Название" />
                </div>
                <div>
                    <input
                        type="text"
                        id="latitudeToAdd"
                        placeholder="Ширина"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="longitudeToAdd"
                        placeholder="Долгота"
                    />
                </div>
                <div>
                    <button onClick={createPlacemark}>Добавить</button>
                </div>
            </form>
        </div>
    );
}

export default AddPlacemark;
