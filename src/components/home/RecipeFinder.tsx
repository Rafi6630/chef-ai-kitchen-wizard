
import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type FindRecipes = {
  onClick: () => void;
  isLoading?: boolean;
  text?: string;
};

const FindRecipes = ({ onClick, isLoading = false, text = "Find a Recipe Using AI" }: FindRecipesProps) => {
  return (
    <Button
      className="w-full py-6 bg-gradient-to-r from-chef-primary to-chef-medium-gray hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg shadow-md text-white rounded-full"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="flex-shrink-0"
          >
            <ChefHat size={24} />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Finding Recipes with Wasfah AI...
          </motion.span>
        </>
      ) : (
        <>
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 bg-white/20 p-1 rounded-full"
          >
            <ChefHat size={24} />
          </motion.div>
          <span>{text}</span>
        </>
      )}
    </Button>
  );
};

export default FindRecipes;
