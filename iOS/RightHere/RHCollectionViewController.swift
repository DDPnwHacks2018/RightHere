//
//  RHCollectionViewController.swift
//  RightHere
//
//  Created by Armour on 2018-01-13.
//  Copyright © 2018 DDPnwHacks2018. All rights reserved.
//

import UIKit
import Alamofire
import SocketIO
import MaterialComponents

class RHCollectionViewController: MDCCollectionViewController {

    let appBar = MDCAppBar()
    let appBarMinimumHeight: CGFloat = 100.0
    let appBarMaximumHeight: CGFloat = 240.0
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

        // Setup header height
        let headerView = appBar.headerViewController.headerView
        headerView.minimumHeight = appBarMinimumHeight
        headerView.maximumHeight = appBarMaximumHeight

        // Set the tracking scroll view
        headerView.trackingScrollView = self.collectionView

        headerView.backgroundColor = UIColor(red: 0.0, green: 0.67, blue: 0.55, alpha: 1.0)

        // Set background image for appBar
        let imageView = UIImageView(image: UIImage(named: "AppBar"))
        imageView.frame = headerView.bounds
        imageView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        headerView.insertSubview(imageView, at: 0)

        // Add Ink Effect
        let inkTouchController = MDCInkTouchController(view: headerView)
        inkTouchController.addInkView()

        // Add Menu Button
        let menuButton = UIBarButtonItem(image: UIImage(named: "AddPost"), style: .done, target: self, action: #selector(onMenuButtonClicked(sender:)))
        self.navigationItem.rightBarButtonItem = menuButton

        // Notification
        NotificationCenter.default.addObserver(self, selector: #selector(onPostsUpdate(notification:)), name: .NotificationPostDidSet, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(onSendComment(notification:)), name: .NotificationSendComment, object: nil)
    }

    // MARK: - Actions

    @objc func onMenuButtonClicked(sender: Any) {
        self.performSegue(withIdentifier: "AddPost", sender: sender)
    }

    @objc func onPostsUpdate(notification: NSNotification) {
        self.collectionView?.reloadData()
    }

    @objc func onSendComment(notification: NSNotification) {
        let row = notification.userInfo?["row"] as! Int
        let comment = notification.userInfo?["comment"] as! String
        if comment == "" {
            let alert = UIAlertController(title: "Alert", message: "Comment is empty, please fill it first", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
            self.present(alert, animated: true, completion: nil)
            return
        }

        let parameters: Parameters = [
            "post_id": appDelegate.posts[row].id,
            "text": comment,
        ]

        Alamofire.request(apiReplyPost, method: .post, parameters: parameters).responseJSON { response in
            if let data = response.data, let utf8Text = String(data: data, encoding: .utf8) {
                print("Data: \(utf8Text)") // original server data as UTF8 string
            }
        }
    }

    // MARK: - StatusBarStyle

    override var childViewControllerForStatusBarStyle: UIViewController? {
        return appBar.headerViewController
    }

    // MARK: - UICollectionViewDataSource

    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return appDelegate.posts.count
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath)

        if let RHCell = cell as? RHCollectionViewCell {
            if appDelegate.posts[indexPath.row].images?[0] != nil {
                let decodedImage = UIImage(data: Data(base64Encoded: "data:image/jpeg;base64," + appDelegate.posts[indexPath.row].images![0])!)
                RHCell.postImageView.image = decodedImage
            } else {
                RHCell.postImageView.image = UIImage(named: "PlaceHolder")
            }
            RHCell.postText.text = appDelegate.posts[indexPath.row].text
        }

        return cell
    }

    // MARK: - UICollectionViewDelegateFlowLayout

    override func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: 375, height: 500)
    }

    override func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 30.0
    }

    override func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 12.0
    }

    override func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    }

    // MARK: - UIScrollViewDelegate
    override func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let headerView = appBar.headerViewController.headerView
        if scrollView == headerView.trackingScrollView {
            headerView.trackingScrollDidScroll()
        }
    }

    override func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        let headerView = appBar.headerViewController.headerView
        if scrollView == headerView.trackingScrollView {
            headerView.trackingScrollDidEndDecelerating()
        }
    }

    override func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool) {
        let headerView = appBar.headerViewController.headerView
        if scrollView == headerView.trackingScrollView {
            headerView.trackingScrollDidEndDraggingWillDecelerate(decelerate)
        }
    }

    override func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
        let headerView = appBar.headerViewController.headerView
        if scrollView == headerView.trackingScrollView {
            headerView.trackingScrollWillEndDragging(withVelocity: velocity, targetContentOffset: targetContentOffset)
        }
    }
}

