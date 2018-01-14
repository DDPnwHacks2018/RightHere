//
// Created by Armour on 2018-01-13.
// Copyright (c) 2018 DDPnwHacks2018. All rights reserved.
//

import Foundation
import MaterialComponents

class RHCollectionViewCell: MDCCollectionViewCell {

    @IBOutlet var postText: UILabel!
    @IBOutlet var postImageView: UIImageView!
    @IBOutlet var commentTextField: UITextField!
    @IBOutlet var commentSendButton: MDCButton!

    override class func setAnimationCurve(_ curve: UIViewAnimationCurve) {
        super.setAnimationCurve(curve)
    }
}

