var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLNull = require('graphql').GraphQLNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQlIn;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

var textType = new GraphQLInputObjectType({
  name: 'text',
  fields: function () {
    return {
      id: {
        type: GraphQLInt,
      },
      text: {
        type: GraphQLString,
      },
      color: {
        type: GraphQLString,
      },
      fontSize: {
        type: GraphQLInt,
      },
      x: {
        type: GraphQLInt,
      },
      y: {
        type: GraphQLInt,
      },
      zIndex: {
        type: GraphQLInt,
      },
    };
  },
});

var textTypeOutput = new GraphQLObjectType({
  name: 'textOutput',
  fields: function () {
    return {
      id: {
        type: GraphQLInt,
      },
      text: {
        type: GraphQLString,
      },
      color: {
        type: GraphQLString,
      },
      fontSize: {
        type: GraphQLInt,
      },
      x: {
        type: GraphQLInt,
      },
      y: {
        type: GraphQLInt,
      },
      zIndex: {
        type: GraphQLInt,
      },
    };
  },
});

var imageType = new GraphQLInputObjectType({
  name: 'image',
  fields: function () {
    return {
      id: {
        type: GraphQLInt,
      },
      src: {
        type: GraphQLString,
      },
      height: {
        type: GraphQLInt,
      },
      width: {
        type: GraphQLInt,
      },
      x: {
        type: GraphQLInt,
      },
      y: {
        type: GraphQLInt,
      },
      zIndex: {
        type: GraphQLInt,
      },
    };
  },
});

var imageTypeOutput = new GraphQLObjectType({
  name: 'imageOutput',
  fields: function () {
    return {
      id: {
        type: GraphQLInt,
      },
      src: {
        type: GraphQLString,
      },
      height: {
        type: GraphQLInt,
      },
      width: {
        type: GraphQLInt,
      },
      x: {
        type: GraphQLInt,
      },
      y: {
        type: GraphQLInt,
      },
      zIndex: {
        type: GraphQLInt,
      },
    };
  },
});

var logoType = new GraphQLObjectType({
  name: 'logo',
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      logoName: {
        type: GraphQLString,
      },
      height: {
        type: GraphQLInt,
      },
      width: {
        type: GraphQLInt,
      },
      texts: {
        type: GraphQLList(textTypeOutput),
      },
      images: {
        type: GraphQLList(imageTypeOutput),
      },
      backgroundColor: {
        type: GraphQLString,
      },
      borderColor: {
        type: GraphQLString,
      },
      borderRadius: {
        type: GraphQLInt,
      },
      borderWidth: {
        type: GraphQLInt,
      },
      padding: {
        type: GraphQLInt,
      },
      margin: {
        type: GraphQLInt,
      },
      lastUpdate: {
        type: GraphQLDate,
      },
    };
  },
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      logos: {
        type: new GraphQLList(logoType),
        resolve: function () {
          const logos = LogoModel.find().exec();
          if (!logos) {
            throw new Error('Error');
          }
          return logos;
        },
      },
      logo: {
        type: logoType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const logoDetails = LogoModel.findById(params.id).exec();
          if (!logoDetails) {
            throw new Error('Error');
          }
          return logoDetails;
        },
      },
    };
  },
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addLogo: {
        type: logoType,
        args: {
          logoName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          height: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          width: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          texts: {
            type: new GraphQLNonNull(GraphQLList(new GraphQLNonNull(textType))),
          },
          images: {
            type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(imageType))),
          },
          backgroundColor: {
            type: new GraphQLNonNull(GraphQLString),
          },
          borderColor: {
            type: new GraphQLNonNull(GraphQLString),
          },
          borderRadius: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          borderWidth: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          padding: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          margin: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve: function (root, params) {
          const logoModel = new LogoModel(params);
          const newLogo = logoModel.save();
          if (!newLogo) {
            throw new Error('Error');
          }
          return newLogo;
        },
      },
      updateLogo: {
        type: logoType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString),
          },
          logoName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          height: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          width: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          texts: {
            type: new GraphQLNonNull(GraphQLList(new GraphQLNonNull(textType))),
          },
          images: {
            type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(imageType))),
          },
          backgroundColor: {
            type: new GraphQLNonNull(GraphQLString),
          },
          borderColor: {
            type: new GraphQLNonNull(GraphQLString),
          },
          borderRadius: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          borderWidth: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          padding: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          margin: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(root, params) {
          return LogoModel.findByIdAndUpdate(
            params.id,
            {
              logoName: params.logoName,
              height: params.height,
              width: params.width,
              texts: params.texts,
              images: params.images,
              backgroundColor: params.backgroundColor,
              borderColor: params.borderColor,
              borderRadius: params.borderRadius,
              borderWidth: params.borderWidth,
              padding: params.padding,
              margin: params.margin,
              lastUpdate: new Date(),
            },
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },
      removeLogo: {
        type: logoType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
          if (!remLogo) {
            throw new Error('Error');
          }
          return remLogo;
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
