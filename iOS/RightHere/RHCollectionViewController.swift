//
//  RHCollectionViewController.swift
//  RightHere
//
//  Created by Armour on 2018-01-13.
//  Copyright © 2018 DDPnwHacks2018. All rights reserved.
//

import UIKit
import SocketIO
import MaterialComponents

class RHCollectionViewController: MDCCollectionViewController {

    let appBar = MDCAppBar()
    let appBarMinimumHeight: CGFloat = 100.0
    let appBarMaximumHeight: CGFloat = 240.0
    let fakeData = [
        ["text": "Text 1 ............................................................"],
        ["text": "Text 2"],
        ["text": "Text 3 ..................."],
        ["text": "Text 4 Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text "],
        ["text": "Text 5"],
        ["text": "Text 6"],
    ]

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

        if UIDevice().userInterfaceIdiom == .phone {
            switch UIScreen.main.nativeBounds.height {
            case 1136:
                print("iPhone 5 or 5S or 5C")
            case 1334:
                print("iPhone 6/6S/7/8")
            case 2208:
                print("iPhone 6+/6S+/7+/8+")
            case 2436:
                print("iPhone X")
            default:
                print("unknown")
            }
        }

        let headerView = appBar.headerViewController.headerView

        // Setup header height
        headerView.minimumHeight = appBarMinimumHeight
        headerView.maximumHeight = appBarMaximumHeight

        // Set the tracking scroll view
        headerView.trackingScrollView = self.collectionView;

        // Set background image for appBar
        let imageView = UIImageView(image: UIImage(named: "AppBar"))
        imageView.frame = headerView.bounds
        imageView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        headerView.insertSubview(imageView, at: 0)
        headerView.backgroundColor = .clear
        appBar.navigationBar.tintColor = .purple

        let menuButton = UIBarButtonItem(image: UIImage(named: "AddPost"), style: .done, target: self, action: #selector(onMenuButtonClicked(sender:)))
        self.navigationItem.rightBarButtonItem = menuButton;
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Actions

    @objc func onMenuButtonClicked(sender: Any) {
        self.performSegue(withIdentifier: "AddPost", sender: sender)
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
        return 6
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath)

        if let RHCell = cell as? RHCollectionViewCell {
            RHCell.postText.text = fakeData[indexPath.row]["text"]
        }

        return cell
    }

    // MARK: - UICollectionViewDelegate
    override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let manager = SocketManager(socketURL: URL(string: "http://169.254.129.166:3000")!, config: [.log(true), .compress])
        let socket = manager.defaultSocket

        socket.on(clientEvent: .connect) {data, ack in
            print("socket connected")
        }

        socket.connect()
    }

    // MARK: - UICollectionViewDelegateFlowLayout

    override func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: 375, height: 300)
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

