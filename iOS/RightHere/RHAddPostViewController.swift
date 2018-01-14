//
// Created by Armour on 2018-01-13.
// Copyright (c) 2018 DDPnwHacks2018. All rights reserved.
//

import UIKit
import Alamofire
import MaterialComponents

class RHAddPostViewController: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate {

    @IBOutlet var newPostStackView: UIStackView!
    @IBOutlet var newPostTextField: MDCTextField!
    @IBOutlet var newPostImageView: UIImageView!

    let appBar = MDCAppBar()
    let appDelegate = UIApplication.shared.delegate as! AppDelegate

    // MARK: - Life Cycle

    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)

        self.addChildViewController(appBar.headerViewController)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)

        self.addChildViewController(appBar.headerViewController)
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        navigationController?.setNavigationBarHidden(true, animated: animated)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // After all other views have been registered.
        appBar.addSubviewsToParent()
        let headerView = appBar.headerViewController.headerView
        headerView.backgroundColor = UIColor(red: 0.0, green: 0.67, blue: 0.55, alpha: 1.0)
        appBar.navigationBar.tintColor = .white

        // Add Menu Button
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
        if self.newPostTextField.text == "" {
            let alert = UIAlertController(title: "Alert", message: "Text is empty, please fill it first", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
            self.present(alert, animated: true, completion: nil)
            return
        }

        if self.newPostImageView.image == nil {
            let alert = UIAlertController(title: "Alert", message: "Image is empty, please upload it first", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
            self.present(alert, animated: true, completion: nil)
            return
        }

        let parameters: Parameters = [
            "text": self.newPostTextField.text!,
            "images": [convertImageToBase64(image: self.newPostImageView.image!)],
            "loc": [
                appDelegate.locationManager.location!.coordinate.latitude,
                appDelegate.locationManager.location!.coordinate.longitude,
            ]
        ]

        Alamofire.request(apiCreatePost, method: .post, parameters: parameters).responseJSON { response in
            if let data = response.data, let utf8Text = String(data: data, encoding: .utf8) {
                print("Data: \(utf8Text)") // original server data as UTF8 string
                let alert = UIAlertController(title: "Alert", message: "Upload", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
                self.present(alert, animated: true, completion: nil)
                return
            }
        }
    }

    // MARK: - StatusBarStyle

    override var childViewControllerForStatusBarStyle: UIViewController? {
        return appBar.headerViewController
    }

    // MARK: - UIImagePickerControllerDelegate

    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String: Any]) {
        let image = info[UIImagePickerControllerEditedImage] as! UIImage
        self.newPostImageView.image = image
        picker.dismiss(animated: true, completion: nil)
    }

    // MARK: - Utils

    func convertImageToBase64(image: UIImage) -> String {
        let imageData = UIImagePNGRepresentation(image)!
        return imageData.base64EncodedString(options: Data.Base64EncodingOptions.lineLength64Characters)
    }
}

