//
//  AppDelegate.swift
//  RightHere
//
//  Created by Armour on 2018-01-13.
//  Copyright © 2018 DDPnwHacks2018. All rights reserved.
//

import UIKit
import Alamofire
import CoreData
import CoreLocation
import SocketIO

extension Notification.Name {
    static let NotificationPostDidSet = Notification.Name(notificationPostDidSet)
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, CLLocationManagerDelegate {

    var window: UIWindow?

    let locationManager = CLLocationManager()
    let socketManager = SocketManager(socketURL: URL(string: "http://\(ip):3000")!, config: [.log(true), .compress])
    var posts: [RHPost] = [] {
        didSet {
            NotificationCenter.default.post(name: .NotificationPostDidSet, object: nil)
        }
    }

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Request Location Service
        locationManager.requestAlwaysAuthorization()
        if CLLocationManager.locationServicesEnabled() {
            locationManager.delegate = self
            locationManager.desiredAccuracy = kCLLocationAccuracyNearestTenMeters
            locationManager.distanceFilter = 10.0  // In meters.
            locationManager.startUpdatingLocation()
        }

        // Override point for customization after application launch.
        let socket = socketManager.defaultSocket
        socket.on(clientEvent: .connect, callback: {data, ack in
            let parameters = [
                "loc": [
                    self.locationManager.location!.coordinate.latitude,
                    self.locationManager.location!.coordinate.longitude,
                ]
            ]

            Alamofire.request(apiGetPost, method: .post, parameters: parameters).responseJSON { response in
                if let data = response.data, let jsonString = String(data: data, encoding: .utf8) {
                    print(jsonString)
                    let jsonData = (jsonString).data(using: .utf8)!
                    let decoder = JSONDecoder()
                    do {
                        let posts = try decoder.decode(_: RHPosts.self, from: jsonData)
                        self.posts = (posts as RHPosts).posts
                    } catch let err {
                        print("Err", err)
                    }
                }
            }
        })
        socket.on("new_post", callback: {data, ack in
            print("New post", data)
        })
        socket.on("new_reply", callback: {data, ack in
            print("New reply", data)
        })
        socket.connect()

        return true
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let socket = socketManager.defaultSocket
        let parameters = [
            "loc": [
                manager.location!.coordinate.latitude,
                manager.location!.coordinate.longitude,
            ]
        ]
        socket.emit("update_user_loc", parameters)
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Error!")
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
        // Saves changes in the application's managed object context before the application terminates.
        self.saveContext()
    }

    // MARK: - Core Data stack

    lazy var persistentContainer: NSPersistentContainer = {
        /*
         The persistent container for the application. This implementation
         creates and returns a container, having loaded the store for the
         application to it. This property is optional since there are legitimate
         error conditions that could cause the creation of the store to fail.
        */
        let container = NSPersistentContainer(name: "RightHere")
        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
            if let error = error as NSError? {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                 
                /*
                 Typical reasons for an error here include:
                 * The parent directory does not exist, cannot be created, or disallows writing.
                 * The persistent store is not accessible, due to permissions or data protection when the device is locked.
                 * The device is out of space.
                 * The store could not be migrated to the current model version.
                 Check the error message to determine what the actual problem was.
                 */
                fatalError("Unresolved error \(error), \(error.userInfo)")
            }
        })
        return container
    }()

    // MARK: - Core Data Saving support

    func saveContext () {
        let context = persistentContainer.viewContext
        if context.hasChanges {
            do {
                try context.save()
            } catch {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                let nserror = error as NSError
                fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
            }
        }
    }

}

