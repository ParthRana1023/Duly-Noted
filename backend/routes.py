from app import app, db
from flask import request, jsonify
from models import Notes

def registered_routes(app):

    @app.route('/api/notes', methods=['GET'])
    def get_allNotes():
        try:
            notes = Notes.query.order_by(Notes.last_updated.desc()).all()
            return jsonify([note.to_json() for note in notes]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/notes/<int:id>', methods=['GET'])
    def get_note(id):
        try:
            note = Notes.query.get_or_404(id)
            return jsonify(note.to_json()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
        
    @app.route('/api/notes', methods=['POST'])
    def create_notes():
        try:
            data = request.get_json()
            note = Notes(title=data['title'], content=data['content'])
            db.session.add(note)
            db.session.commit()
            return jsonify(note.to_json()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
        
    @app.route('/api/notes/<int:id>', methods=['DELETE'])
    def delete_notes(id):
        try:
            note = Notes.query.get_or_404(id)
            db.session.delete(note)
            db.session.commit()
            return jsonify({'message': 'Note deleted successfully'}), 204
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

    @app.route('/api/notes/<int:id>', methods=['PUT'])
    def update_notes(id):
        try:
            note = Notes.query.get_or_404(id)
            data = request.get_json()
            note.title = data['title']
            note.content = data['content']
            db.session.commit()
            return jsonify(note.to_json()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
