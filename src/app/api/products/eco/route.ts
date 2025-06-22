import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/productModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const skip = (page - 1) * limit;
    
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json({ 
        error: 'Invalid pagination parameters', 
        status: 400 
      }, { status: 400 });
    }
    
    const [products, totalCount] = await Promise.all([
      Product.find({ isEcoFriendly: true })
        .sort({ greenScore: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('seller', 'name'),
      Product.countDocuments({ isEcoFriendly: true })
    ]);
    
    const hasMore = skip + products.length < totalCount;
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = page;
    
    return NextResponse.json({ 
      products, 
      hasMore, 
      totalCount, 
      totalPages,
      currentPage,
      limit,
      status: 200 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching eco products:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      status: 500 
    }, { status: 500 });
  }
} 