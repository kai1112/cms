"use strict";
// export const createTokens = async (
//     user: any,
//     accessTokenKey: string,
//     refreshTokenKey: string,
//   ): Promise<any> => {
//     let id = user._id
//     if(!user._id){
//       id = user.id
//     }
//     const accessToken = await JWT.encode(
//       new JwtPayload(
//         tokenInfo.issuer,
//         tokenInfo.audience,
//         id.toString(),
//         accessTokenKey,
//         tokenInfo.accessTokenValidity,
//       ),
//     );
//     if (!accessToken) throw new InternalError();
//     const refreshToken = await JWT.encode(
//       new JwtPayload(
//         tokenInfo.issuer,
//         tokenInfo.audience,
//         id.toString(),
//         refreshTokenKey,
//         tokenInfo.refreshTokenValidity,
//       ),
//     );
//     if (!refreshToken) throw new InternalError();
//     return {
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     } as Tokens;
//   };
//# sourceMappingURL=authUtils.js.map