import React from "react";
import { useSelector } from "react-redux";
import { CollectionsOverviewContainer } from "./CollectionsOverview.styles";
import CollectionPreview from "../preview-collection/CollectionPreview";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selector";

const CollectionsOverview = () => {
  const collections = useSelector(selectCollectionsForPreview);
  return (
    <CollectionsOverviewContainer>
      {collections.map(({ id, ...otherCollectionsProps }) => (
        <CollectionPreview key={id} {...otherCollectionsProps} />
      ))}
    </CollectionsOverviewContainer>
  );
};

export default CollectionsOverview;
