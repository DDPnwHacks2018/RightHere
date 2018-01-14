//
// Created by Armour on 2018-01-13.
// Copyright (c) 2018 DDPnwHacks2018. All rights reserved.
//

import UIKit
import MaterialComponents

extension Notification.Name {
    static let NotificationSendComment = Notification.Name(notificationSendComment)
}

class RHCollectionViewCell: MDCCollectionViewCell {

    @IBOutlet var postText: UILabel!
    @IBOutlet var postImageView: UIImageView!
    @IBOutlet var commentTextField: UITextField!
    @IBOutlet var commentSendButton: MDCButton!

    @IBAction func onCommentButtonClicked(_ sender: MDCButton) {
        let indexPath: IndexPath? = (self.superview as! UICollectionView).indexPath(for: self)
        let info : [String: AnyHashable] = [
            "row": indexPath!.row,
            "comment" : commentTextField.text!,
        ]
        NotificationCenter.default.post(name: .NotificationSendComment, object: nil, userInfo: info)
    }
}

