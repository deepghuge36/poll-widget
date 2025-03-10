import path from 'path'
import process from 'process'

export default {
  entry: './src/PollWidget.tsx', // Point to PollWidget.tsx
  output: {
    path: path.resolve(process.cwd(), 'build/static/js'),
    filename: 'poll-widget.js',
    library: 'PollWidgetLibrary', // Expose it globally
    libraryTarget: 'umd',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
}
