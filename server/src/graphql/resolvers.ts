//import { IResolvers } from "apollo-server-express"
import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';
import { Database, Listing } from '../lib/types';

export const resolvers: IResolvers = {
  //export const resolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteRes.value) {
        throw new Error('failed to delete listing');
      }

      return deleteRes.value;
    },
  },
  Listing: {
    //* ApolloServer and many other GraghQL libs allow us to omit Simple or
    //* Trivial Resolvers, so if a Resolver is not specified it willl read for the property of the object of the same name
    //* Remember: even if don't specify Trivial Resolver, this fields are being resolve by the GraphQL Library implicitly
    //title: (listing: Listing) => listing.title,
    //image: (listing: Listing) => listing.image,
    id: (listing: Listing): string => listing._id.toString(),
  },
};
