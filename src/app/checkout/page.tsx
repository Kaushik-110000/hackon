import react from 'react'

function page() {

    // const generateShareLink = () => {
    //   const orderId = Math.random().toString(36).substr(2, 9);
    //   const link = `${window.location.origin}/shared-order/${orderId}`;
    //   setShareLink(link);
    //   setShowShareModal(true);
    // };

    // const copyToClipboard = async () => {
    //   try {
    //     await navigator.clipboard.writeText(shareLink);
    //     setCopied(true);
    //     setTimeout(() => setCopied(false), 2000);
    //   } catch (err) {
    //     console.error('Failed to copy: ', err);
    //   }
    // };



    return (<>hiii
        {/* Share Order Section */}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Share order with friends</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">Reduce packaging together</h3>
                    <p className="text-sm text-blue-700">Share this order with friends to combine shipping and reduce environmental impact</p>
                  </div>
                  <div className="text-2xl">📦</div>
                </div>
                <div className="space-y-2 text-xs text-blue-700">
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Friends can join your order within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Combined shipping reduces packaging waste by 60%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Everyone saves on shipping costs</span>
                  </div>
                </div>
                <button 
                  onClick={generateShareLink}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm"
                >
                  Share Order
                </button>
              </div>
            </div> */}

        {/* Shipping Address */}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-600">123 Main Street</p>
                    <p className="text-sm text-gray-600">Apartment 4B</p>
                    <p className="text-sm text-gray-600">New York, NY 10001</p>
                    <p className="text-sm text-gray-600">United States</p>
                    <p className="text-sm text-gray-600">Phone: +1 (555) 123-4567</p>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">Change</button>
                </div>
              </div>
            </div> */}

        {/* Payment Method */}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Payment method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" className="text-blue-600" defaultChecked />
                  <span className="ml-3 text-sm">Credit or debit card</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" className="text-blue-600" />
                  <span className="ml-3 text-sm">Amazon Pay</span>
                </label>
              </div>
            </div> */}
        {/* Share Order Modal */}

        {/* {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share order with friends</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">
                Share this link with friends to combine orders and reduce packaging waste:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-600">⏰</span>
                <span className="text-sm font-medium text-yellow-800">Link expires in 24 hours</span>
              </div>
              <p className="text-xs text-yellow-700">
                Friends must join and pay within 24 hours for combined shipping
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded text-sm"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Share via WhatsApp
                  const text = `Hey! I'm ordering some eco-friendly products. Want to join and save on shipping? ${shareLink}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-sm"
              >
                Share via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>)
}
export default page;