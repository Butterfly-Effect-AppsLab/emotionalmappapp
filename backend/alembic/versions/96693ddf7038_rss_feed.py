"""Rss feed

Revision ID: 96693ddf7038
Revises: 6ba25e05a1c7
Create Date: 2020-06-08 14:59:42.606219

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '96693ddf7038'
down_revision = '6ba25e05a1c7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('rss_feeds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('news', sa.Column('link', sa.String(), nullable=True))
    op.add_column('news', sa.Column('pub_date', sa.DateTime(), nullable=True))
    op.add_column('news', sa.Column('rss_feed_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'news', 'rss_feeds', ['rss_feed_id'], ['id'])
    op.drop_column('news', 'feedback')
    op.drop_column('news', 'author')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('news', sa.Column('author', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('news', sa.Column('feedback', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'news', type_='foreignkey')
    op.drop_column('news', 'rss_feed_id')
    op.drop_column('news', 'pub_date')
    op.drop_column('news', 'link')
    op.drop_table('rss_feeds')
    # ### end Alembic commands ###
