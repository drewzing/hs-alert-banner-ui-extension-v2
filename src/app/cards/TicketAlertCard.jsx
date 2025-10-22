import React, { useEffect, useRef, useState } from "react";
import { hubspot, Text } from "@hubspot/ui-extensions";

const FIELDS = ["alert_present", "alert_title", "alert_message", "alert_type"];
const shownKeys = new Set();

const Card = ({ addAlert, fetchProps, onPropsUpdate }) => {
  const [loaded, setLoaded] = useState(false);
  const [present, setPresent] = useState(false);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("info");
  const lastKeyRef = useRef(null);

  // initial fetch
  useEffect(() => {
    fetchProps(FIELDS).then((p) => {
      setPresent(String(p.alert_present).toLowerCase() === "true");
      setTitle(p.alert_title || "Alert");
      setMsg(p.alert_message || "");
      const ok = ["info", "success", "warning", "danger"];
      setType(ok.includes(p.alert_type) ? p.alert_type : "info");
      setLoaded(true);
    });
  }, [fetchProps]);

  // live updates
  useEffect(() => {
    const unsub = onPropsUpdate?.((p) => {
      if ("alert_present" in p)
        setPresent(String(p.alert_present).toLowerCase() === "true");
      if ("alert_title" in p) setTitle(p.alert_title || "Alert");
      if ("alert_message" in p) setMsg(p.alert_message || "");
      if ("alert_type" in p) {
        const ok = ["info", "success", "warning", "danger"];
        setType(ok.includes(p.alert_type) ? p.alert_type : "info");
      }
    });
    return () => typeof unsub === "function" && unsub();
  }, [onPropsUpdate]);

  // add alert
  useEffect(() => {
    if (!loaded || !present) {
      lastKeyRef.current = null;
      return;
    }
    if (!msg.trim()) return;

    const key = `${title}|${msg}|${type}`;
    if (lastKeyRef.current === key || shownKeys.has(key)) return;

    addAlert({
      title: title || "Alert",
      message: `${msg}`,
      type,
    });

    lastKeyRef.current = key;
    shownKeys.add(key);
  }, [loaded, present, title, msg, type, addAlert]);

  return <Text>Alert card loaded.</Text>;
};

hubspot.extend(({ actions }) => (
  <Card
    addAlert={actions.addAlert}
    fetchProps={actions.fetchCrmObjectProperties}
    onPropsUpdate={actions.onCrmPropertiesUpdate}
  />
));

export default Card;
