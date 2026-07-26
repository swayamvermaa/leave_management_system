// import admin from "firebase-admin";
// import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../serviceAccountKey.json" with {
  type: "json",
};

initializeApp({
  credential: cert(serviceAccount),
});

const adminAuth = getAuth();

export default adminAuth;