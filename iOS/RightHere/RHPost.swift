//
// Created by Armour on 2018-01-14.
// Copyright (c) 2018 DDPnwHacks2018. All rights reserved.
//

import Foundation

struct RHPost: Codable {
    let id: String
    let text: String
    let images: [String]?
    let replies: [RHReply]
    let time: String

    private enum CodingKeys: String, CodingKey {
        case id = "_id"
        case text
        case images
        case replies
        case time
    }
}

struct RHReply: Codable {
    let id: String
    let post_id: String
    let time: String
    let text: String

    private enum CodingKeys: String, CodingKey {
        case id = "_id"
        case post_id
        case text
        case time
    }
}

struct RHPosts: Codable {
    let posts: [RHPost]
}

