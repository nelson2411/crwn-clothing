import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/collection-item/CollectionItem";
import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./collection.styles";
import { selectCollection } from "../../redux/shop/shop.selector";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const collection = useSelector(selectCollection(collectionId));
  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
