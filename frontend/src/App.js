import React from "react";
import "./App.css";
import AddPlacemark from "./components/AddPlacemark";
import RegistrationForm from "./components/auth/RegistrationForm";
import ListPlacemarks from "./components/ListPlacemarks";
import YandexMap from "./components/YandexMap";
import axios from "axios";
import Header from "../src/components/Header/Header";

function App() {
    const [noPlacemarks, setNoPlacemarks] = React.useState(false);
    const [passedAuthorization, setPassedAuthorization] = React.useState(false);
    const [dataPlacemarks, setPlacemarker] = React.useState([]);
    const [hidePlacemarker, setHidePlacemarker] = React.useState(false);
    const [newCoordinates, setNewCoordinates] = React.useState(false);

    React.useEffect(() => {
        if (passedAuthorization) {
            getPlacemarksData();
        }
    }, [passedAuthorization]);

    const getPlacemarksData = () => {
        axios
            .post("http://localhost:80/getPlacemarksData/", {
                token: localStorage.getItem("token"),
            })
            .then((resultat) => {
                if (resultat.data !== "[]") {
                    let dataFromServer = JSON.parse(resultat.data);

                    const initialValue = [];

                    for (let i = 0; i < dataFromServer.length; i++) {
                        initialValue.push({
                            id: i,
                            name: dataFromServer[i].name,
                            latitude: dataFromServer[i].latitude,
                            longitude: dataFromServer[i].longitude,
                        });
                    }

                    setPlacemarker(initialValue);
                } else {
                    setNoPlacemarks("Меток нет");
                }
            });
    };

    const exit = () => {
        localStorage.removeItem("login");
        localStorage.removeItem("token");
        localStorage.setItem("exited", "true");
        setPassedAuthorization(false);
    };

    return (
        <div>
            {!passedAuthorization ? (
                <RegistrationForm
                    setPassedAuthorization={setPassedAuthorization}
                />
            ) : (
                <>
                    <Header exit={exit} />
                    <div className="App">
                        <div style={{ display: "flex" }}>
                            <div style={{ float: "left" }}>
                                <AddPlacemark
                                    setNoPlacemarks={setNoPlacemarks}
                                    setPlacemarker={setPlacemarker}
                                    dataPlacemarks={dataPlacemarks}
                                />

                                <div style={{ marginBottom: 25 }}>
                                    {noPlacemarks
                                        ? noPlacemarks
                                        : dataPlacemarks.map((item, index) => (
                                              <ListPlacemarks
                                                  key={index}
                                                  name={item.name}
                                                  latitude={item.latitude}
                                                  longitude={item.longitude}
                                                  setNoPlacemarks={
                                                      setNoPlacemarks
                                                  }
                                                  noPlacemarks={noPlacemarks}
                                                  setHidePlacemarker={
                                                      setHidePlacemarker
                                                  }
                                                  hidePlacemarker={
                                                      hidePlacemarker
                                                  }
                                                  setNewCoordinates={
                                                      setNewCoordinates
                                                  }
                                              />
                                          ))}
                                </div>
                            </div>
                            <div style={{ float: "right" }}>
                                <YandexMap
                                    dataPlacemarks={dataPlacemarks}
                                    newCoordinates={newCoordinates}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
