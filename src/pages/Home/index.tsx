import { Button } from "antd";
import { Feature, Map, View } from "ol";
import Popup from "ol-popup";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import { mockMarkers } from "../../constants/markers";
import { getMarkers } from "../../store/selectors/markers.selector";
import { Marker, setMarkers } from "../../store/slices/markersSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import "./styles.scss";

export default function HomePage() {
    const [showModal, setShowModal] = useState(false)
    const ref = useRef<Map>(null)

    const markers = useAppSelector(getMarkers)

    const dispatch = useAppDispatch()

    const handleModalShow = () => {
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false)
    }

    useEffect(() => {
        if (!localStorage.getItem('markers')) {
            localStorage.setItem('markers', JSON.stringify(mockMarkers))
        }
        const localMarkers: Marker[] = JSON.parse(localStorage.getItem('markers') || '')
        dispatch(setMarkers(localMarkers))
        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: localMarkers.map(marker => new Feature({
                    type: 'icon',
                    name: marker.name,
                    geometry: new Point(marker.coordinates),
                })),
            }),
            style: new Style({
                image: new Icon({
                    src: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
                    size: [512, 512],
                    scale: 0.05
                })
            })
        });

        const popup = new Popup();

        // @ts-ignore
        ref.current = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer
            ],
            overlays: [popup],
            view: new View({
                projection: 'EPSG:4326',
                center: [39.7233, 47.2313],
                zoom: 12,
            }),
        });

        ref.current.on('pointermove', function (evt) {
            const feature = ref.current?.forEachFeatureAtPixel(evt.pixel, (feature) => feature);

            if (!feature) {
                popup.hide()
                return;
            }

            popup.show(evt.coordinate, `<h1>${feature.get('name')}</h1>`);
        });

        return () => {
            ref.current?.setTarget(undefined);
        };
    }, []);

    useEffect(() => {
        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: markers.markers.map(marker => new Feature({
                    type: 'icon',
                    name: marker.name,
                    geometry: new Point(marker.coordinates),
                })),
            }),
            style: new Style({
                image: new Icon({
                    src: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
                    size: [512, 512],
                    scale: 0.05
                })
            })
        });
        ref.current?.setLayers([
            new TileLayer({
                source: new OSM(),
            }),
            vectorLayer
        ])
    }, [markers])

    return (
        <section>
            <Button type="primary" onClick={handleModalShow}>
                Добавить новую точку
            </Button>
            <div id="map" style={{ width: "100%", height: "95vh" }} />
            {showModal &&
                <Modal showModal={showModal} onModalClose={handleModalClose} />
            }
        </section>
    )
}
