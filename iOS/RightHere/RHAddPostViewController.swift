//
// Created by Armour on 2018-01-13.
// Copyright (c) 2018 DDPnwHacks2018. All rights reserved.
//

import UIKit
import Alamofire
import MaterialComponents

class RHAddPostViewController: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate {

    @IBOutlet var newPostText: UITextField!
    @IBOutlet var newPostImageView: UIImageView!
    
    // MARK: - Life Cycle

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        navigationController?.setNavigationBarHidden(false, animated: animated)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        let menuButton = UIBarButtonItem(image: UIImage(named: "SendPost"), style: .done, target: self, action: #selector(onMenuButtonClicked(sender:)))
        self.navigationItem.rightBarButtonItem = menuButton;

        let singleTap = UITapGestureRecognizer(target: self, action: #selector(onNewPostImageViewClick(sender:)))
        newPostImageView.isUserInteractionEnabled = true
        newPostImageView.addGestureRecognizer(singleTap)
    }

    // MARK: - Actions

    @objc func onNewPostImageViewClick(sender: Any) {
        let camera = RHCameraHandler(delegate_: self)
        let optionMenu = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        optionMenu.popoverPresentationController?.sourceView = self.view

        let takePhoto = UIAlertAction(title: "Take Photo", style: .default) { (alert : UIAlertAction!) in
            camera.getCameraOn(self, canEdit: true)
        }
        let sharePhoto = UIAlertAction(title: "Photo Library", style: .default) { (alert : UIAlertAction!) in
            camera.getPhotoLibraryOn(self, canEdit: true)
        }
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel) { (alert : UIAlertAction!) in
        }
        optionMenu.addAction(takePhoto)
        optionMenu.addAction(sharePhoto)
        optionMenu.addAction(cancelAction)
        self.present(optionMenu, animated: true, completion: nil)
    }

    @objc func onMenuButtonClicked(sender: Any) {
        Alamofire.request("http://169.254.129.166/posts/create").responseJSON { response in
            print("Request: \(String(describing: response.request))")   // original url request
            print("Response: \(String(describing: response.response))") // http url response
            print("Result: \(response.result)")                         // response serialization result

            if let json = response.result.value {
                print("JSON: \(json)") // serialized json response
            }

            if let data = response.data, let utf8Text = String(data: data, encoding: .utf8) {
                print("Data: \(utf8Text)") // original server data as UTF8 string
            }
        }
    }

    // MARK: - UIImagePickerControllerDelegate

    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        let image = info[UIImagePickerControllerEditedImage] as! UIImage

        self.newPostImageView.image = image

        picker.dismiss(animated: true, completion: nil)
    }
}

