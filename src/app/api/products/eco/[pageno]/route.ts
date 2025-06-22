import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/productModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pageno: string }> }
) {
  try {
    await connectDB();
    
    // Get page number from URL parameter
    const { pageno } = await params;
    const page = parseInt(pageno, 10);
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '12', 10); // Default 12 items per page
    
    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json({ 
        error: 'Invalid pagination parameters', 
        status: 400 
      }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
      Product.find({ isEcoFriendly: true })
        .sort({ greenScore: -1, createdAt: -1 }) // Sort by green score and newest first
        .skip(skip)
        .limit(limit)
        .populate('seller', 'name'), // Populate seller info
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