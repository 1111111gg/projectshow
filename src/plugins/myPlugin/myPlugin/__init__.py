"""
This is where the implementation of the plugin code goes.
The mygames-class is imported from both run_plugin.py and run_debug.py
"""
import sys
import logging
from webgme_bindings import PluginBase

# Setup a logger
logger = logging.getLogger('mygames')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)  # By default it logs to stderr..
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


class mygames(PluginBase):
  def main(self):
    active_node = self.active_node
    core = self.core
    logger = self.logger
    self.namespace = None
    META = self.META
    logger.debug('path: {0}'.format(core.get_path(active_node)))
    logger.info('name: {0}'.format(core.get_attribute(active_node, 'name')))
    logger.warn('pos : {0}'.format(core.get_registry(active_node, 'position')))
    logger.error('guid: {0}'.format(core.get_guid(active_node)))
    nodesList = core.load_sub_tree(active_node)
    nodes = {}
    tempnode={}
    mytile={}
    flips={}
    nodesList1 = core.load_sub_tree(active_node)
    for node in nodesList:
      nodes[core.get_path(node)] = node

    
    for node in nodesList:
      if (core.is_instance_of(node, META['GameState'])):
        playpath=core.get_pointer_path(node, 'currentPlayer')
        player=nodes[playpath]
        movepath=core.get_pointer_path(node,'currentMove')
        mymove=nodes[movepath]
        movetile=core.get_parent(mymove)
        board=[]
        for node1 in nodesList1:
          if(core.is_instance_of(node1,META['Piece'])):
            Piececolor=core.get_attribute(node1, 'color')
            piecetile=core.get_parent(node1)
            pboard=core.get_parent(piecetile)
            pstate=core.get_parent(pboard)
            if(pstate==node):
              Piecerow=core.get_attribute( piecetile, 'row')
              Piececolumn=core.get_attribute( piecetile, 'column')
              Flips=[]
              Flips1=[]
              Flips2=[]
              for node2 in nodesList:
                if(core.is_instance_of(node2,META['mightFlip'])):
                  flipsrcpath=core.get_pointer_path(node2,'src')
                  flipsrc=nodes[flipsrcpath]
                  flipdstpath=core.get_pointer_path(node2,'dst')
                  flipdst=nodes[flipdstpath]
                  dsttile=core.get_parent(flipdst)
                  dstate=core.get_parent(core.get_parent(node2))
                  if(dstate==node):
                    flips={
                    'row':core.get_attribute(dsttile,'row'),
                    'column':core.get_attribute(dsttile,'column'),
                  }
                    Flips.append(flips)
              if((Piecerow==core.get_attribute(movetile, 'row'))&(Piececolumn==core.get_attribute(movetile, 'column'))):
                  Flips1=Flips
              if((Piecerow!=core.get_attribute(movetile, 'row'))|(Piececolumn!=core.get_attribute(movetile, 'column'))):
                  Flips1=Flips2
              mytile={
                'color':Piececolor,
                'row':Piecerow,
                'column':Piececolumn,
                'flips':Flips1,
        }
              board.append(mytile)
        for node1 in nodesList:
          if(core.is_instance_of(node1,META['Tile'])):
            tilerow=core.get_attribute(node1,'row')
            tilecolumn=core.get_attribute(node1,'column')
            pboard=core.get_parent(node1)
            pstate=core.get_parent(pboard)
            if(pstate==node):
              mytile={
          'color':core.get_attribute(node1, 'color'),
                'row':tilerow,
                'column':tilecolumn,
          'flips':Flips2,
        }
              board.append(mytile)
        organized_board = []
        for row in range(8):
          row_tiles = [tile for tile in board if tile['row'] == row ]
          sorted_row = sorted(row_tiles, key=lambda x: x['column'])
          organized_board.append(sorted_row)
        filtered_board = []
        seen_positions = set()
        for row_tiles in organized_board:
          for tile in row_tiles:
            position = (tile['row'], tile['column'])
            if position not in seen_positions :
              filtered_board.append(tile)
              seen_positions.add(position)
        game_state_data = {
            'name': core.get_attribute(node, 'name'),
            'currentPlayer':core.get_attribute(player, 'color'),
            'currentMove': {
              'color': core.get_attribute(mymove, 'color'),
              'row': core.get_attribute(movetile, 'row'),
              'column': core.get_attribute(movetile, 'column')
                    },
              'board': filtered_board
                }
        logger.info(game_state_data)

                        
      
   

