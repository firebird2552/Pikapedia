//react imports
import React, { useEffect, useState } from "react";

// bootstrap imports
// import Col from "react-bootstrap/Col";
import { getVersions } from "../../../api/GetData";
import { RenderMove } from "./RenderMove";

const RenderMoves = ({ moves }) => {
  const [loading, setLoading] = useState(null);
  const [versionGroups, setVersionGroups] = useState([]);

  useEffect(() => {
    if (versionGroups.length > 0) {
      setLoading(false);
    } else {
      if (!loading) {
        setLoading(true);
        const fetchData = async () => {
          const data = await getVersions();
          setVersionGroups(data);
        };
        fetchData().catch(console.error);
      }
    }
    return () => {};
  }, [versionGroups, loading]);

  let displayedMoves = loading ? (
    <div>Loading...</div>
  ) : moves != null ? (
    moves.map(({ version_group_details, move }) => (
      <RenderMove
        key={move.name}
        move={move}
        version_group_details={version_group_details}
      />
    ))
  ) : (
    <div>Loading...</div>
  );
  return displayedMoves;
};

export default RenderMoves;
