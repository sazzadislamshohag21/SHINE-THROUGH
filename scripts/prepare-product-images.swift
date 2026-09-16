import Foundation
import AppKit
import ImageIO
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let data = try Data(contentsOf: root.appendingPathComponent("asseats/product-squares/sources.json"))
let items = try JSONSerialization.jsonObject(with: data) as! [[String:String]]
for item in items {
 let input = root.appendingPathComponent(item["source"]!)
 guard let image = NSImage(contentsOf: input), let cg = image.cgImage(forProposedRect:nil,context:nil,hints:nil), let ctx = CGContext(data:nil,width:1080,height:1080,bitsPerComponent:8,bytesPerRow:0,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.noneSkipLast.rawValue) else { fatalError(input.path) }
 ctx.setFillColor(CGColor(red:238/255,green:236/255,blue:230/255,alpha:1));ctx.fill(CGRect(x:0,y:0,width:1080,height:1080))
 let scale = min(1080 / CGFloat(cg.width),1080 / CGFloat(cg.height));let w=CGFloat(cg.width)*scale;let h=CGFloat(cg.height)*scale
 ctx.interpolationQuality = .high;ctx.draw(cg,in:CGRect(x:(1080-w)/2,y:(1080-h)/2,width:w,height:h))
 let dest = CGImageDestinationCreateWithURL(root.appendingPathComponent(item["output"]!) as CFURL,"public.jpeg" as CFString,1,nil)!
 CGImageDestinationAddImage(dest,ctx.makeImage()!,[kCGImageDestinationLossyCompressionQuality:0.88] as CFDictionary)
 precondition(CGImageDestinationFinalize(dest))
}
print("Prepared \(items.count) 1080 × 1080 product images")
