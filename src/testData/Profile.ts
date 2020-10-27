import { HatRecord } from "@dataswift/hat-js/lib/interfaces/hat-record.interface";
import { Profile } from "../features/profile/profile.interface";

const TEST_PROFILE: HatRecord<Profile> = {
  "endpoint": "rumpel/profile",
  "recordId": "875029f5-a178-4539-a82c-37161816aa67",
  "data": {
    "about": {
      "body": "",
      "title": ""
    },
    "photo": {
      "avatar": "https://testleytis194.hubat.net/api/v2.6/files/content/rumpel1586992748231.jpg"
    },
    "online": {
      "blog": "https://test-blog.com",
      "google": "",
      "twitter": "",
      "website": "https://test-website.com",
      "youtube": "",
      "facebook": "",
      "linkedin": ""
    },
    "shared": false,
    "address": {
      "city": "",
      "county": "",
      "country": ""
    },
    "contact": {
      "mobile": "",
      "landline": "",
      "primaryEmail": "",
      "alternativeEmail": ""
    },
    "personal": {
      "title": "",
      "gender": "",
      "ageGroup": "",
      "lastName": "",
      "nickName": "",
      "birthDate": "",
      "firstName": "",
      "middleName": "",
      "preferredName": ""
    },
    "dateCreated": 1586992748,
    "emergencyContact": {
      "mobile": "",
      "lastName": "",
      "firstName": "",
      "relationship": ""
    }
  }
};

export default TEST_PROFILE;