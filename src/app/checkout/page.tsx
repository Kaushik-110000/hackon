import React from 'react'

export default function CheckoutPage() {
  return (
    <>
      <div style={{ background: '#f5f6f6', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        {/* Header */}
        <div style={{ background: '#131921', color: 'white', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 28, fontWeight: 'bold', letterSpacing: 1 }}>
            <span style={{ color: '#ff9900' }}>amazon</span>.in
          </div>
          <div style={{ fontSize: 28, fontWeight: 500 }}>Secure checkout <span style={{ fontSize: 18 }}>▼</span></div>
          <div style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8 }}>🛒</span>Cart
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          {/* Left Side */}
          <div style={{ width: 700, marginRight: 32 }}>
            {/* Delivery Address */}
            <div style={{ background: 'white', borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Delivering to Ayush Kumar Singh</div>
              <div style={{ margin: '8px 0 0 0', color: '#222' }}>
                Hostel E, NIT Jamshedpur, Adityapur, JAMSHEDPUR, JHARKHAND, 831014, India
              </div>
              <div style={{ color: '#007185', marginTop: 8, cursor: 'pointer', fontSize: 15 }}>Add delivery instructions</div>
              <div style={{ color: '#007185', position: 'absolute', right: 40, top: 40, cursor: 'pointer', fontSize: 15 }}>Change</div>
            </div>

            {/* Payment Method */}
            <div style={{ background: 'white', borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Pay on delivery (Cash/Card)</div>
              <div style={{ color: '#007185', marginTop: 8, cursor: 'pointer', fontSize: 15 }}>Use a gift card, voucher or promo code</div>
              <div style={{ color: '#007185', position: 'absolute', right: 40, top: 140, cursor: 'pointer', fontSize: 15 }}>Change</div>
            </div>

            {/* Offers */}
            <div style={{ background: 'white', borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Offers</div>
              <div style={{ textAlign: 'center', margin: '24px 0', color: '#555' }}>No offers available at this time</div>
              <button style={{ background: '#ffd814', border: 'none', borderRadius: 20, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }}>Next step</button>
            </div>

            {/* Product Summary */}
            <div style={{ background: 'white', borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Arriving 26 Jun 2025</div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <img src={"/assests/mockProducts_images/copper_bottle.webp"} alt="product" style={{ width: 60, height: 120, objectFit: 'contain', marginRight: 16, borderRadius: 4, border: '1px solid #eee' }} />
                <div>
                  <div style={{ fontWeight: 500, fontSize: 16 }}>Pexpo Bravo 1000 ISI Certified Stainless Steel Water Bottle 1 LTR, 24 Hr Hot & Cold, Leak Proof, Vacuum Insulated Flask Bottle, Ideal for Home, Office, Gym, Outings, and School- Military Green</div>
                  <div style={{ color: '#007185', marginTop: 8, fontSize: 15, cursor: 'pointer' }}>Review Order</div>
                </div>
              </div>
            </div>

            {/* Help & Policy */}
            <div style={{ background: 'white', borderRadius: 8, padding: 16, fontSize: 13, color: '#222' }}>
              Need help? Check our help <span style={{ color: '#007185', cursor: 'pointer' }}>pages</span> or <span style={{ color: '#007185', cursor: 'pointer' }}>contact us 24x7</span><br /><br />
              When your order is placed, we'll send you an e-mail message acknowledging receipt of your order. If you choose to pay using an electronic payment method (credit card, debit card or net banking), you will be directed to your bank's website to complete your payment. Your contract to purchase an item will not be complete until we receive your electronic payment and dispatch your item. If you choose to pay using Pay on Delivery (POD), you can pay using cash/card/net banking when you receive your item.<br /><br />
              See Amazon.in's <span style={{ color: '#007185', cursor: 'pointer' }}>Return Policy</span>.
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div style={{ width: 350 }}>
            <div style={{ background: 'white', borderRadius: 8, padding: 24, marginBottom: 24, position: 'sticky', top: 32 }}>
              <button style={{ width: '100%', background: '#ffd814', border: 'none', borderRadius: 20, padding: '10px 0', fontWeight: 600, fontSize: 16, marginBottom: 16, cursor: 'pointer' }}>Next step</button>
              <div style={{ color: '#555', fontSize: 14, marginBottom: 16 }}>
                Sign up for Prime or select "Not right now" to continue checking out. You'll still have a chance to review and edit your order before it's final.
              </div>
              <div style={{ fontSize: 15, marginBottom: 8 }}>Items: <span style={{ float: 'right' }}>₹699.00</span></div>
              <div style={{ fontSize: 15, marginBottom: 8 }}>Delivery: <span style={{ float: 'right' }}>₹40.00</span></div>
              <div style={{ fontSize: 15, marginBottom: 8, color: '#007185', cursor: 'pointer' }}>Cash/Pay on Delivery fee <span style={{ float: 'right', color: '#222' }}>₹7.00</span></div>
              <div style={{ fontSize: 15, marginBottom: 8 }}>Total: <span style={{ float: 'right' }}>₹746.00</span></div>
              <div style={{ fontSize: 15, marginBottom: 8 }}>Promotion Applied: <span style={{ float: 'right', color: '#B12704' }}>-₹40.00</span></div>
              <div style={{ fontWeight: 700, fontSize: 20, marginTop: 16 }}>Order Total: <span style={{ float: 'right', color: '#111' }}>₹706.00</span></div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{ background: '#404c5a', color: 'white', textAlign: 'center', padding: '16px 0', fontSize: 16 }}>
        Back to top
      </div>
      <div style={{ background: '#232f3e', color: 'white', textAlign: 'center', padding: '40px 0 24px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
            <span style={{ color: '#ff9900' }}>amazon</span>
          </div>
          <div style={{ fontSize: 18, marginBottom: 16 }}>Help</div>
        </div>
      </div>
      <div style={{ background: '#131a22', color: 'white', textAlign: 'center', padding: '16px 0', fontSize: 15 }}>
        <span style={{ margin: '0 12px', cursor: 'pointer', color: '#d7d7d7' }}>Conditions of Use & Sale</span>
        <span style={{ margin: '0 12px', cursor: 'pointer', color: '#d7d7d7' }}>Privacy Notice</span>
        <span style={{ margin: '0 12px', cursor: 'pointer', color: '#d7d7d7' }}>Interest-Based Ads</span>
        <br />
        <span style={{ color: '#d7d7d7' }}>
          © 1996-2025, Amazon.com, Inc. or its affiliates
        </span>
      </div>
    </>
  );
}